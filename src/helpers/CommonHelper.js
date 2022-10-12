
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
        console.log('Does not contain a string')
    }
}


