export function detectFilled(event) {
    
    let tag = document.getElementById(event.target.id + "-text")

    if (event.target.value.length > 0) {
        tag.classList.add("fix-top")
    } else {
        tag.classList.remove("fix-top")
    }

}