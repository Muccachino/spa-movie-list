import { redirect } from "react-router-dom";
import { destroyMovie } from "./handleMovies";

export async function action({
    params
}: {
    params: {id: string}
}) {
    await destroyMovie(params.id);
    return redirect(`/`);
}