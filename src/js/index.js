import axios from "axios";

async function getResults(query) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const key = "da07beb1527fc5a305ed0862c19cc2d1";
    const url = "http://food2fork.com/api/search";

    try{
        const res = await axios(`${proxy}${url}?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } 
    catch(error){
        alert(error);
    }
}

getResults("quiche");