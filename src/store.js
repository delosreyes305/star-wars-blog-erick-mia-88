export const initialStore = () => {
  return {
    characters: [],
    planets: [],
    vehicles: [],
    favorites: []
  };
};
 
export default function storeReducer(store, action = {}) {
  switch (action.type) {
 
    case "set_characters":
      return { ...store, characters: action.payload };
 
    case "set_planets":
      return { ...store, planets: action.payload };
 
    case "set_vehicles":
      return { ...store, vehicles: action.payload };
 
    case "add_favorite":
      // Avoid duplicates
      const alreadyIn = store.favorites.find(
        (f) => f.uid === action.payload.uid && f.type === action.payload.type
      );
      if (alreadyIn) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };
 
    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          (f) => !(f.uid === action.payload.uid && f.type === action.payload.type)
        )
      };
 
    default:
      throw Error("Unknown action: " + action.type);
  }
}
 