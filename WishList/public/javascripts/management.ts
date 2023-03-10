import {IChild} from "./interfaces/IChilds";
import {IWish} from "./interfaces/IPresents";
const loadList = () => {
    fetch('./wishlist/children')
        .then(c => {
            return c.json();
        })
        .then(data => {
            const childs:IChild[] = data as IChild[];
            let select = ``;
            childs.forEach(elem => {
                const option = `<option value=${elem.name}>${elem.name}</option>`
                select += option;
            });
            (document.getElementById('childs') as HTMLSelectElement).innerHTML = select;
        });
}

const addChild = () => {
    let url = './children';

    /*if ((document.querySelector('#tfChildName') as HTMLInputElement).value.split(" ").length > 1) {
        alert("No successful! Pplease dont use Space in the names!!");
        return;
    }*/

    if (+((document.getElementById('tfAge') as HTMLInputElement).value) > 116) {
        alert("Age too high!");
        return;
    }

    // @ts-ignore
    const newChild: IChild = {
        id:0,
        name:(document.getElementById('tfChildName') as HTMLInputElement).value,
        age:+(document.getElementById('tfAge') as HTMLInputElement).value,
        wishes:[]
    }

    const init = {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newChild)
    }

    fetch(url, init)
        .then(res => {
            if (!(res.status === 200)) {
                throw new Error("HTTP Post error!!");
            }
            alert("Child successfully added!!");
            loadList();
        })
        .catch(err => {
            console.log(err);
        });
    
}

    const addWish = () => {
    const name = (document.getElementById('childs') as HTMLSelectElement).value;

    let id:number = 0;
    fetch('./wishlist/children')
        .then(c => {
            return c.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.includes(name)) id = data[i].id;
            }
            const url = `./children/${id}/wishes`;
            const newWish: IWish = {
                id:0,
                name:(document.getElementById('tfPresentName') as HTMLInputElement).value,
                url:(document.getElementById('tfURL') as HTMLInputElement).value,
                img_url:(document.getElementById('tfImgURL') as HTMLInputElement).value,
            }

            const init = {
                method: 'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newWish)
            }
            fetch(url, init)
                .then(res => {
                    if (!(res.status === 200)) {
                        throw new Error("HTTP Post error!!");
                    }
                    alert("Wish successfully added!!");
                })
                .catch(err => {
                    alert("Wish not success fully added!");
                });
        });
}

onload = () => {

    (document.getElementById("childButton") as HTMLButtonElement).onclick = addChild;
    (document.getElementById("wishButton") as HTMLButtonElement).onclick = addWish;

    loadList();

}