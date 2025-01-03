from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

# Paths to datasets
ratings_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/ratingsupdated.csv"
movies_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/moviesupdated.csv"
user_movie_table_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/user_movie_table.csv"

# Define the request body schema
class UserRating(BaseModel):
    user_id: int
    ratings: list[dict]  # [{"movie_id": 1, "rating": 5}, {"movie_id": 2, "rating": 4}, ...]

@app.post("/submit-ratings")
def submit_ratings(user_rating: UserRating):
    try:
        # Step 1: Load existing ratings
        print("Loading existing ratings...")
        ratings = pd.read_csv(ratings_path)
        print("Existing ratings loaded successfully!")

        # Step 2: Add new ratings to the DataFrame
        print("Adding new ratings...")
        new_ratings = pd.DataFrame(user_rating.ratings)
        new_ratings["user_id"] = user_rating.user_id

        # Append new ratings to existing ratings
        updated_ratings = pd.concat([ratings, new_ratings], ignore_index=True)

        # Step 3: Save updated ratings
        updated_ratings.to_csv(ratings_path, index=False)
        print("Ratings updated and saved successfully!")

        # Step 4: Update user_movie_table.csv
        print("Updating user_movie_table.csv...")
        movies = pd.read_csv(movies_path)  # Load movies dataset
        user_movie_table = pd.merge(updated_ratings, movies, on="movie_id", how="inner")
        user_movie_table.to_csv(user_movie_table_path, index=False)
        print("user_movie_table.csv updated successfully!")

        return {"message": "Ratings and user_movie_table updated successfully!"}

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error saving ratings: {str(e)}")