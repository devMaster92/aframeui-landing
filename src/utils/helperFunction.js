function convertToTitleCase(str) {
    try {
        if (typeof (str) === "string" && isNaN(str)) {
            return str
                .replace(/_\w/g, m => {
                    return m[1].toUpperCase()
                })
                .replace(/-\w/g, m => {
                    return m[1].toUpperCase()
                })
                .replace(/([A-Z])/g, " $1")
                .trim()
                .toLowerCase()
                .split(' ')
                .map(function (word) {
                    return (word.charAt(0).toUpperCase() + word.slice(1));
                }).join(' ').replace(/\s\s+/g, ' ').trim();
        } else {
            return str;
        }
    } catch (e) {
        console.log("Could not convert to title case, str is: ", str, " error: ", e);
        return str;
    }
}

function abbreviateNumber(number) {
    let SI_POSTFIXES = ["", "k", "M", "B", "T"];
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier === 0) return number;
    let postfix = SI_POSTFIXES[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    let formatted = scaled.toFixed(1) + '';
    if (/\.0$/.test(formatted))
        formatted = formatted.substr(0, formatted.length - 2);
    return formatted + postfix;
}

export {convertToTitleCase, abbreviateNumber};