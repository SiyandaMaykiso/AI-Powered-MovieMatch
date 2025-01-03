from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

# Define the request body schema
class UserRating(BaseModel):
    user_id: int
    ratings: list[dict]  # [{"movie_id": 1, "rating": 5}, {"movie_id": 2, "rating": 4}, ...]

# Path to the user-movie ratings file
ratings_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/ratingsupdated.csv"

@app.post("/submit-ratings")
def submit_ratings(user_rating: UserRating):
    try:
        # Load existing ratings
        ratings = pd.read_csv(ratings_path)
        
        # Add new ratings to the DataFrame
        new_ratings = pd.DataFrame(user_rating.ratings)
        new_ratings["user_id"] = user_rating.user_id
        
        # Append and save
        updated_ratings = pd.concat([ratings, new_ratings], ignore_index=True)
        updated_ratings.to_csv(ratings_path, index=False)
        
        return {"message": "Ratings submitted successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving ratings: {str(e)}")