const fs = require("fs");

// Convert GneMark to HTML
function gneMarkToHTML(text) {
    // Convert Headings ($ -> <h1>, $$ -> <h2>, etc.)
    text = text.replace(/^(\${1,6})\s?(.*)$/gm, (_, hashes, content) => {
        let level = hashes.length;
        return `<h${level}>${content.trim()}</h${level}>`;
    });

    // Convert Bold and Italic
    text = text.replace(/\?(.*?)\?/g, "<b>$1</b>");
    text = text.replace(/\^(.*?)\^/g, "<i>$1</i>");

    // Convert Lists (> -> <ul><li>)
    text = text.replace(/(^> .+(\n> .+)*)/gm, (match) => {
        const listItems = match.split("\n").map((line) => `<li>${line.slice(2)}</li>`).join("");
        return `<ul>${listItems}</ul>`;
    });

    // Convert Blockquotes (% -> <blockquote>)
    text = text.replace(/^%\s?(.*)$/gm, "<blockquote>$1</blockquote>");

    // Convert Links (::Text::[URL])
    text = text.replace(/::(.*?)::\[(.*?)\]/g, '<a href="$2">$1</a>');

    // Convert Images (::img[Alt](URL))
    text = text.replace(/::img\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Convert Tables (::table:: ... ::endtable::)
    text = text.replace(/::table::\n([\s\S]*?)\n::endtable::/g, (_, tableContent) => {
        let rows = tableContent.trim().split("\n").map(row => {
            let columns = row.split("|").map(col => col.trim()).filter(col => col.length > 0);
            if (row.includes("---")) return null; // Ignore separator row
            return `<tr>${columns.map(col => `<td>${col}</td>`).join("")}</tr>`;
        }).filter(row => row !== null);
        
        if (rows.length > 0) {
            // Make the first row <th> (header)
            let headerRow = rows.shift().replace(/<td>/g, "<th>").replace(/<\/td>/g, "</th>");
            return `<table><thead>${headerRow}</thead><tbody>${rows.join("")}</tbody></table>`;
        }

        return "";
    });

    return text;
}

module.exports = { gneMarkToHTML };
