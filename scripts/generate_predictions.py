import pandas as pd  # For data manipulation
import pickle  # To load the trained model
from surprise import Dataset, Reader

# Path to the trained model and dataset
model_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/models/trained_svd_model.pkl"
dataset_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/user_movie_table.csv"

# User ID to generate recommendations for
target_user_id = 3  # Change as needed

# Step 1: Load the trained model
print("Loading trained SVD model...")
with open(model_path, "rb") as file:
    model = pickle.load(file)
print("Model loaded successfully!")

# Step 2: Load the dataset
print("Loading user-movie dataset...")
data = pd.read_csv(dataset_path)
print("Data loaded successfully!")

# Step 3: Identify unseen movies for the target user
print(f"Finding movies not rated by user {target_user_id}...")
user_rated_movies = data[data["user_id"] == target_user_id]["movie_id"].unique()
all_movies = data["movie_id"].unique()
unseen_movies = set(all_movies) - set(user_rated_movies)

print(f"User {target_user_id} has not rated {len(unseen_movies)} movies.")

# Step 4: Predict ratings for unseen movies
print("Predicting ratings for unseen movies...")
predictions = []
for movie_id in unseen_movies:
    prediction = model.predict(target_user_id, movie_id)
    predictions.append((movie_id, prediction.est))

# Step 5: Sort movies by predicted rating
sorted_predictions = sorted(predictions, key=lambda x: x[1], reverse=True)

# Step 6: Display top recommendations
top_n = 10  # Number of recommendations to display
print(f"Top {top_n} recommendations for user {target_user_id}:")
for movie_id, predicted_rating in sorted_predictions[:top_n]:
    movie_title = data[data["movie_id"] == movie_id]["title"].iloc[0]
    print(f"Movie: {movie_title}, Predicted Rating: {predicted_rating:.2f}")