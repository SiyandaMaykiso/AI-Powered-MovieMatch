from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import pickle

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Load the trained model
model_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/models/trained_svd_model.pkl"
print("Loading trained SVD model...")
try:
    with open(model_path, "rb") as file:
        model = pickle.load(file)
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: Model file not found. Ensure the model path is correct.")
    raise

# Load the dataset
dataset_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/New_Cleaned_User-Movie_Table.csv"
print("Loading user-movie dataset...")
try:
    data = pd.read_csv(dataset_path)
    print("Data loaded successfully!")
except FileNotFoundError:
    print("Error: Dataset file not found. Ensure the dataset path is correct.")
    raise

# Load movie titles for recommendations
movie_titles_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/moviesupdated.csv"
try:
    movie_titles = pd.read_csv(movie_titles_path)
except FileNotFoundError:
    print("Error: Movie titles file not found. Ensure the movie titles path is correct.")
    raise

# Load questionnaire movies
questionnaire_movies_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/questionnaire_movies.csv"
try:
    questionnaire_movies = pd.read_csv(questionnaire_movies_path)
    print("Questionnaire movies loaded successfully!")
except FileNotFoundError:
    print("Error: Questionnaire movies file not found. Ensure the file path is correct.")
    raise

# Define schemas
class RecommendationRequest(BaseModel):
    user_id: int
    top_n: int = 10

class SubmitRatingsRequest(BaseModel):
    user_id: int
    ratings: list[dict]  # List of {"movie_id": int, "rating": float}

@app.get("/")
def root():
    return {"message": "Welcome to the Movie Recommendation API!"}

# Recommendation endpoint
@app.post("/api/recommendations")
def get_recommendations(request: RecommendationRequest):
    user_id = request.user_id
    top_n = request.top_n

    # Check if user exists in the dataset
    if user_id not in data["user_id"].unique():
        raise HTTPException(status_code=404, detail="User ID not found")

    # Find movies not rated by the user
    rated_movies = data[data["user_id"] == user_id]["movie_id"].unique()
    all_movies = data["movie_id"].unique()
    unseen_movies = [movie for movie in all_movies if movie not in rated_movies]

    # Predict ratings for unseen movies
    predictions = [
        (movie, model.predict(user_id, movie).est)
        for movie in unseen_movies
    ]

    # Sort predictions by rating
    top_recommendations = sorted(predictions, key=lambda x: x[1], reverse=True)[:top_n]

    # Fetch movie titles
    results = []
    for movie, rating in top_recommendations:
        title = movie_titles[movie_titles["movie_id"] == movie]["title"].values
        if title.size > 0:
            results.append({
                "movie_id": int(movie),  # Ensure movie_id is a Python int
                "title": str(title[0]),
                "predicted_rating": float(rating)  # Ensure rating is a Python float
            })

    return {"user_id": user_id, "recommendations": results}

# Submit ratings endpoint
@app.post("/api/submit-ratings")
def submit_ratings(request: SubmitRatingsRequest):
    user_id = request.user_id
    ratings = request.ratings

    # Simulate saving the ratings (replace with actual database logic if needed)
    print(f"Received ratings for user {user_id}: {ratings}")

    return {"message": "Ratings submitted successfully", "user_id": user_id, "ratings": ratings}

# Questionnaire endpoint
@app.get("/api/questionnaire")
def get_questionnaire():
    """
    Fetch a list of movies for the questionnaire from questionnaire_movies.csv.
    """
    try:
        # Extract relevant columns from the questionnaire_movies dataset
        # Assuming questionnaire_movies has columns: "movie_id", "title", and "genres"
        movies = questionnaire_movies[["movie_id", "title", "genres"]].to_dict(orient="records")
        return {"movies": movies}
    except Exception as e:
        print(f"Error fetching questionnaire data: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch questionnaire data.")