
class CustomAPIError extends Error{
    constructor(message){
        super(message)
        //this.statusCodes=StatusCodes.BAD_REQUEST
    }
}
export default CustomAPIError