import pandas as pd  # type: ignore
import pickle

# Step 1: Load the saved model
print("Loading the saved model...")
model_path = "../models/best_svd_model.pkl"
with open(model_path, "rb") as file:
    model = pickle.load(file)
print("Model loaded successfully!")

# Step 2: Paths to your data
movies_path = "../data/ml-latest-small/moviesupdated.csv"
ratings_path = "../data/ml-latest-small/ratingsupdated.csv"

# Step 3: Load datasets
print("Loading movies from:", movies_path)
print("Loading ratings from:", ratings_path)
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)

# Step 4: Merge datasets to include movie titles (optional)
print("Merging ratings with movies...")
data = pd.merge(ratings, movies, on="movie_id", how="inner")

# Debugging: Preview the merged data
print("Preview of merged data:")
print(data.head())

# Step 5: Create a flat user-movie rating table
print("Creating a flat user-movie rating table...")
user_movie_table = data[["user_id", "movie_id", "rating"]]

# Debugging: Check the flat table
print("Flat User-Movie Table:")
print(user_movie_table.head())

# Step 6: Handle missing or duplicate ratings by averaging (if required)
print("Aggregating duplicate ratings (if any)...")
user_movie_table = user_movie_table.groupby(["user_id", "movie_id"], as_index=False).mean()

# Debugging: Check the aggregated table
print("User-Movie Table after aggregation:")
print(user_movie_table.head())

# Step 7: Save the flat user-movie table to a CSV file (optional)
output_path = "../data/ml-latest-small/user_movie_table.csv"
print(f"Saving user-movie table to {output_path}...")

# Save the DataFrame without any pivot structure
user_movie_table.to_csv(output_path, index=False)

print("Done.")