import pandas as pd

# Paths to your data
movies_path = "data/ml-latest-small/moviesupdated.csv"
ratings_path = "data/ml-latest-small/ratingsupdated.csv"

# Load datasets
print("Loading movies from:", movies_path)
print("Loading ratings from:", ratings_path)
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)

# Merge datasets to include movie titles (optional)
print("Merging ratings with movies...")
data = pd.merge(ratings, movies, left_on="movie_id", right_on="movie_id", how="left")

# Create a user-movie interaction matrix
print("Creating user-movie interaction matrix...")
user_movie_matrix = data.pivot_table(index="user_id", columns="movie_id", values="rating")

# Fill missing values in the matrix with 0
user_movie_matrix = user_movie_matrix.fillna(0)

# Display the resulting user-movie matrix
print("User-Movie Interaction Matrix:")
print(user_movie_matrix.head())

# Save the user-movie matrix to a CSV file (optional)
output_path = "data/ml-latest-small/user_movie_matrix.csv"
print(f"Saving user-movie interaction matrix to {output_path}...")
user_movie_matrix.to_csv(output_path)
print("Done.")