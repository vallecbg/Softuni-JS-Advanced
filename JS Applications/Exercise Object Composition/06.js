function sortedList() {
    let list = (function () {
        let collection = [];

        let collectionProcessor = {
            add: function (element) {
                collection.push(element);
                collection.sort(ascendingOrder);
                this.size++;
                return collection;
            },
            remove: function (index) {
                if (isValidIndex(index)) {
                    collection.splice(index, 1);
                    this.size--;
                    return collection;
                }
            },
            get: function (index) {
                if (isValidIndex(index)) {
                    return collection[index];
                }
            },
            size: 0
        };
        return collectionProcessor;

        function ascendingOrder(a, b) {
            return a - b;
        }

        function isValidIndex(index) {
            return index >= 0 && index < collection.length;
        }
    })();
    return list;
}

let list = sortedList();
list.add(3);
list.add(2);
list.add(1);
console.log(list.size);
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.remove(0));
console.log(list.get(2));