// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "ADD_NEWTODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case "CHANGE_COMPLETED":
      return {
        ...state,
        todos: action.payload,
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    case "SET_VIEWTODO":
      return {
        ...state,
        viewTodo: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    // case "SET_NEW_CURRENT_CATEGORY":
    //   return {
    //     ...state,
    //     currentCategory: [action.payload],
    //   };

    // case "ADD_ITEM_TO_CARD":
    //   return {
    //     ...state,
    //     itemsInCard: action.payload,
    //   };

    // case "REMOVE_ITEM_FROM_CARD":
    //   return {
    //     ...state,
    //     itemsInCard: state.itemsInCard.filter(
    //       (x) => x.id !== action.payload.id
    //     ),
    //   };
    // case "REMOVE_MOVIE_FROM_WATCHLIST":
    //   return {
    //     ...state,
    //     watchlist: state.watchlist.filter(
    //       (movie) => movie.id !== action.payload
    //     ),
    //   };

    // case "ADD_MOVIE_TOWATCHED":
    //   return {
    //     ...state,
    //     watchlist: state.watchlist.filter(
    //       (movie) => movie.id !== action.payload.id
    //     ),
    //     watched: [action.payload, ...state.watched],
    //   };

    // case "MOVE_TO_WATCHLIST":
    //   return {
    //     ...state,
    //     watched: state.watched.filter(
    //       (movie) => movie.id !== action.payload.id
    //     ),
    //     watchlist: [action.payload, ...state.watchlist],
    //   };

    // case "REMOVE_FROM_WATCHED":
    //   return {
    //     ...state,
    //     watched: state.watched.filter((movie) => movie.id !== action.payload),
    //   };

    default:
      return state;
  }
};
