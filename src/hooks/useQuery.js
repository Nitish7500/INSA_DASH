import { useLocation } from "react-router-dom";

export const useQuery = (params) => {
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    let queries = {};
    params.forEach(param => {
        queries[param] = query.get(param);
    });

    return queries
    
}