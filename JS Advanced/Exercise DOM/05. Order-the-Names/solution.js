function solve() {
    let letters = {
        A:[], 
        B:[], 
        C:[], 
        D:[], 
        E:[], 
        F:[], 
        G:[], 
        H:[], 
        I:[], 
        J:[], 
        K:[], 
        L:[], 
        M:[], 
        N:['Nixon'], 
        O:[], 
        P:['Peterson'], 
        Q:[], 
        R:[], 
        S:[], 
        T:[], 
        U:[], 
        V:[], 
        W:[], 
        X:[], 
        Y:[], 
        Z:[]
    };

    const dbIndex = {
        A: 1,
        B: 2,
        C: 3,
        D: 4,
        E: 5,
        F: 6,
        G: 7,
        H: 8,
        I: 9,
        J: 10,
        K: 11,
        L: 12,
        M: 13,
        N: 14,
        O: 15,
        P: 16,
        Q: 17,
        R: 18,
        S: 19,
        T: 20,
        U: 21,
        V: 22,
        W: 23,
        X: 24,
        Y: 25,
        Z: 26
    };

    document.querySelector("#exercise > article > button").addEventListener("click", add);

    function add(){
        let name = document.querySelector("#exercise > article > input[type=text]").value;
        let firstLetter = name[0].toUpperCase();
        
        let asd = firstLetter + name.substring(1).toLowerCase();
        letters[firstLetter].push(asd);

        let listItems = Array.from(document.querySelectorAll('ol li'));

        listItems[dbIndex[firstLetter] - 1].textContent = letters[firstLetter].join(', ');
    }
}