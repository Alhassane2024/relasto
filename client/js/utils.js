export const fectData = async(url)=>{
    try {
        const response = await fetch(url);
        const datas = await response.json();
        return datas;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

