import {IWish} from "./interfaces/IPresents";
import {IChild} from "./interfaces/IChilds";

const fillTable = (id:number) => {
    fetch(`./children/${id}/wishes`)
        .then(c => {
            return c.json();
        })
        .then(data => {
            const presents:IWish[] = data as IWish[];
            let tableC = ``;
            tableC = `<tr class="heading"><td>Name</td><td>Link</td><td>Image</td></tr>`;
            presents.forEach(elem => {
                tableC += `<tr><td>${elem.name}</td><td><a href=${elem.url}>${elem.url}</a></td><td><img src=${elem.img_url} alt=""></td></tr>`
            });
            (document.getElementById('wishTable') as HTMLTableElement).innerHTML = tableC;
        });
}

const showChildsList = () => {
    fetch('./wishlist/children')
        .then(c => {
            return c.json();
        })
        .then(data => {
            const childs:IChild[] = data as IChild[];
            const table = (document.getElementById('childTable') as HTMLTableElement);
            const trElement = document.createElement("tr");
            trElement.setAttribute("class",  "heading");
            trElement.innerHTML = `<td>Name</td><td>Age</td>`;
            table.appendChild(trElement);
            childs.forEach(elem => {
                const trElem = document.createElement("tr");
                trElem.setAttribute("class",  "amog");
                trElem.innerHTML += `<td>${elem.name}</td><td>${elem.age}</td>`;
                trElem.addEventListener("click", () => fillTable(elem.id));
                //trElem.setAttribute("id", elem.id + "");
                table.appendChild(trElem);
            });
        });
}



onload = () => {

    showChildsList();
    fillTable(1);

}