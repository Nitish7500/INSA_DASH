
//to capitalize first letter 
export function capitalizeFirstLetter(string) {
    let lcString = string.toLowerCase();
    return lcString.charAt(0).toUpperCase() + lcString.slice(1);
}

// Capitalise each word in a string
export function capitalizeEachWordInString(string) {
    if(string != null) {
        const lcGivenString = string.toLowerCase();
        let words = lcGivenString.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(' ');
    } else {
        // console.log('Does not contain a string')
    }
}

// to fetch parameters from URL
export function getParametersFromURL(parameterIdentifier) {
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const parameter = query.get(`${parameterIdentifier}`);
    return parameter;
}

// to format date from yyyy-mm-dd format to dd-mm-yyyy format
export const formatDate = (responseDate) => {
    const date = responseDate;
    let result = '';
    if (date === undefined || date === '' || date === null) {
        // console.log(result);
        return null;
    } else {
        const [year, month, day] = date.split('-');
        result = [day, month, year].join('-');
        // console.log('formatted date using func', result);
        return new Date(result);
    }
}

// return bool for values coming in Yes and No from API Request
export const returnBool = (status) => {
    let value = (status === 'Yes') ? true : false;
    return value;
}