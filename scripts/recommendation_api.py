from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
from surprise import Dataset, Reader

# Initialize FastAPI app
app = FastAPI()

# Load the trained model
model_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/models/trained_svd_model.pkl"
print("Loading trained SVD model...")
with open(model_path, "rb") as file:
    model = pickle.load(file)
print("Model loaded successfully!")

# Load the dataset
dataset_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/user_movie_table.csv"
print("Loading user-movie dataset...")
data = pd.read_csv(dataset_path)
print("Data loaded successfully!")

# Define a schema for user requests
class RecommendationRequest(BaseModel):
    user_id: int
    top_n: int = 10

@app.get("/")
def root():
    return {"message": "Welcome to the Movie Recommendation API!"}

# Recommendation endpoint
@app.post("/recommendations")
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
    movie_titles = pd.read_csv("/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/moviesupdated.csv")
    results = [
        {"movie_id": movie, "title": movie_titles[movie_titles["movie_id"] == movie]["title"].values[0], "predicted_rating": rating}
        for movie, rating in top_recommendations
    ]

    return {"user_id": user_id, "recommendations": results}