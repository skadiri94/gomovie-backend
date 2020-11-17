const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://user1:12345@gomovie.le8bz.mongodb.net/gomovie?retryWrites=true&w=majority";

try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}
const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, rating: 9.5 },
      { title: "The Hangover", numberInStock: 10, rating: 9 },
      { title: "Wedding Crashers", numberInStock: 15, rating: 8.5 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, rating: 9.5 },
      { title: "Terminator", numberInStock: 10, rating: 8.5 },
      { title: "The Avengers", numberInStock: 15, rating: 5 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, rating: 6.5 },
      { title: "When Harry Met Sally", numberInStock: 10, rating: 5 },
      { title: "Pretty Woman", numberInStock: 15, rating: 8 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, rating: 7 },
      { title: "Gone Girl", numberInStock: 10, rating: 8.6 },
      { title: "The Others", numberInStock: 15, rating: 5 },
    ],
  },
];

async function seed() {
  try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await Movie.deleteMany({});
    await Genre.deleteMany({});

    for (let genre of data) {
      const { _id: genreId } = await new Genre({ name: genre.name }).save();
      const movies = genre.movies.map((movie) => ({
        ...movie,
        genre: { _id: genreId, name: genre.name },
      }));
      await Movie.insertMany(movies);
    }

    mongoose.disconnect();
    console.info("Done!");
  } catch (error) {
    if (error) console.log("Error", error);
  }
}

seed();
