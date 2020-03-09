// {% anchor id [text] %}
function anchor(args) {
    console.log(args);
    if (!args[0]) {
        return '<b>Missing 1st argument!</b>';
    }

    return `<a id="${args[0]}" href="#${args[0]}" class="anchor">${args[1] || args[0]}</a>`;
}

hexo.extend.tag.register("anchor", anchor);
