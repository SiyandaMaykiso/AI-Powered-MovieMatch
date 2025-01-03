import pandas as pd
import re
from datetime import datetime

# Paths to your datasets
movies_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/moviesupdated.csv"
ratings_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/ratingsupdated.csv"

# Step 1: Load datasets
print("Loading movies and ratings datasets...")
movies = pd.read_csv(movies_path)
ratings = pd.read_csv(ratings_path)
print("Datasets loaded successfully!")

# Step 2: Extract release year from title if 'year' column is missing
if "year" not in movies.columns:
    print("Extracting year from title...")
    movies["year"] = movies["title"].str.extract(r"\((\d{4})\)").astype(float)
    print("Year extraction complete!")

# Step 3: Calculate average ratings and number of ratings
print("Calculating average ratings and number of ratings...")
average_ratings = ratings.groupby("movie_id")["rating"].mean().reset_index()
rating_counts = ratings.groupby("movie_id")["rating"].count().reset_index()
rating_counts.rename(columns={"rating": "num_ratings"}, inplace=True)

# Merge average ratings and counts into movies DataFrame
movies = pd.merge(movies, average_ratings, on="movie_id", how="left")
movies = pd.merge(movies, rating_counts, on="movie_id", how="left")
movies = movies.dropna(subset=["rating"])
movies["rating"] = movies["rating"].astype(float)

# Step 4: Apply weighted rating formula
print("Applying weighted rating formula...")
C = movies["rating"].mean()
m = 50  # Minimum number of ratings required
movies["weighted_rating"] = (
    (movies["num_ratings"] / (movies["num_ratings"] + m)) * movies["rating"]
    + (m / (movies["num_ratings"] + m)) * C
)

# Step 5: Filter recent movies (last 47 years)
print("Filtering movies from the last 47 years...")
current_year = datetime.now().year
movies = movies[movies["year"] >= current_year - 47]

# Step 6: Select top movies by genre without repeats
print("Selecting top movies by genre...")
top_movies_by_genre = []
selected_movie_ids = set()
unique_genres = set(
    genre for genres in movies["genres"].dropna() for genre in genres.split("|")
)

for genre in unique_genres:
    genre_movies = movies[
        movies["genres"].str.contains(genre, na=False) & ~movies["movie_id"].isin(selected_movie_ids)
    ]
    top_movies = genre_movies.sort_values("weighted_rating", ascending=False).head(3)
    selected_movie_ids.update(top_movies["movie_id"].tolist())
    top_movies_by_genre.extend(top_movies.values.tolist())

# Create a DataFrame of selected movies
questionnaire_movies = pd.DataFrame(top_movies_by_genre, columns=movies.columns)

# Deduplicate and limit the total number of movies (e.g., 20 movies)
questionnaire_movies = questionnaire_movies.drop_duplicates(subset=["movie_id"]).head(20)

# Step 7: Save the questionnaire to a file
output_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/questionnaire_movies.csv"
print(f"Saving questionnaire movies to {output_path}...")
questionnaire_movies.to_csv(output_path, index=False)
print("Questionnaire saved successfully!")

# Debugging: Display selected movies
print("Selected movies for the questionnaire:")
print(questionnaire_movies[["title", "genres", "weighted_rating"]])