const global_state ={
    search:[],
    movieinfo:{},
    loading:false,
    errormessage:""
    
       
};
const reducer = (state = global_state, action) => {
    const newState = {
        ...state,
        movieinfo:Object.assign(state.movieinfo),
        search:state.search.slice()
    };

        if(action.type === 'loading')
    {
        newState.loading= true;
    }

    if(action.type === 'searchmovies')
    {
        
        newState.loading= false;
        newState.search=action.value;
    }
    if(action.type === 'moreinfo')
    {
        
        newState.loading= false;
        newState.movieinfo= action.value;
    }
    if(action.type === 'tabchange')
    {
        newState.search=[];
        newState.movieinfo={};
        newState.loading=false;
        newState.errormessage="";
    }
    if(action.type === 'error')
    {
        newState.loading= false;
        newState.errormessage="YOU HAVE ENTERED WRONG MOVIE NAME OR THERE MAY BE NO MOVIES OF THIS NAME";
    }

    return newState;
}

export default reducer;