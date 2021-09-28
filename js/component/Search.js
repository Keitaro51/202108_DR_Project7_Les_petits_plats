export default class Search{
    /**
     * [format raw datas for text search (exclude short words, special carac, case sensitivity, etc...)]
     *
     * @param   {string}  rawString  [full recipe text]
     *
     * @return  {array}             [formated full recipe text]
     */
    stringFormating(rawString){
        return rawString.toLowerCase().split(/[,:'.]+/).filter(word => word.length > 2)
    }
}