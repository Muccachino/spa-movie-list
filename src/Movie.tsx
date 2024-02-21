import { Form, useLoaderData } from "react-router-dom";
import { getMovie } from "./handleMovies";


type MovieType = {
  id: string;
  title: string;
  runtime: number;
  social: string;
  img: string;
}

export async function loader({params}: { params: { id: string}}) {
  const movie = await getMovie(params.id);
  if(!movie) {
    throw new Response("Movie not found", {
      status: 404,
      statusText: "Not Found"
    })
  }
  return {movie};
}


export default function Movie() {
  const {movie} = useLoaderData() as {movie: MovieType};

  return (
    <div id="movie">
      <div>
        <img height={300} key={movie.img} src={movie.img}/>
      </div>
      <div>
        <h1>{movie.title ? movie.title : "No title"}</h1>
        <i>{movie.runtime && `Runtime: ${movie.runtime} Min.`}</i>
        {movie.social && (
          <p>
            <a href={`www.x.com/${movie.social}`} target="_blank">
              {movie.social}
            </a>
          </p>
        )}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form 
            method="delete"
            action="destroy"
            >
              <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}