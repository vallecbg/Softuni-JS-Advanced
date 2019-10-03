let solution = (function solve(){
    return {
        add: (vec1, vec2) => {
          result = [vec1[0] + vec2[0], vec1[1] + vec2[1]]
            return result
        },

        multiply: (vec1, scalar) => {
          result = [vec1[0] * scalar, vec1[1] * scalar]
            return result
        },

        length: (vec1) => {
            //check if its needed the sqrt and pow
            result = Math.sqrt(
                Math.pow(vec1[0], 2) +
                Math.pow(vec1[1], 2))
            return result;
        },

        dot: (vec1, vec2) => {
            result = vec1[0]*vec2[0] + vec1[1]*vec2[1]
            return result;
        },

        cross: (vec1, vec2) => {
            result = vec1[0]*vec2[1] - vec1[1]*vec2[0]
            return result;
        }
    }
}())

console.log(solution.dot([2, 3], [2, -1]));