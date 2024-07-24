import { pgFrameworks } from "../instances/iPgManager/iPgManager.js";

export class imageModel{
    static async uploadImage({data, name}){
        try {
            const key = 'insert_image'
            const params = [data, name]
            const resultSet = await pgFrameworks.exeQuery({
                key,
                params
            })
            return {success: true, resultSet}
        } catch (error) {
            return {success: false, error: error.message}
        }
    }
}