/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 03 - 11 - 2021
 * Author: Daniel Poquet Ramirez
 * Description: Manages the database queries of the sensor device feature
 */

import db from "../database";
import Council from "./Council";

export default class CouncilDatabaseHandler {

    // Logic Methods 
    /**
     * Get council information by given id
     * councilId: N -> getCouncilByIdFromDB() -> council: Council
     *
     * @param councilId - ID of the council you want to get data from
     * @returns
     */
    public getCouncilByIdFromDB(councilId: number): Promise<Council> {
        var query = "SELECT * FROM `council` WHERE id = " + councilId;
        return new Promise<Council>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject()
                    }
                    let council = new Council()
                    if (results.length != 0) {
                        council.setId(results[0].id)
                        council.setName(results[0].name)
                        council.setAddress(results[0].address)
                        council.setPhone(results[0].phone_number);
                        council.setEmail(results[0].email);
                        council.setWeb(results[0].web);
                        council.setPostalCode(results[0].postal_code);
                        council.setIban(results[0].iban);
                    }
                    resolve(council)
                })

            })
        })
    }

    /**
     * Create a new council
     * council: Council -> createCouncilInDB()
     *
     * @param council - council we want to create
     * @returns
     */
    public createCouncilInDB(council: Council): Promise<void> {
        var query = "INSERT INTO `council` (`name`, `address`, `phone_number`, `email`, `web`, `postal_code`, `iban`) " +
            "VALUES ('"+council.getName()+"', '"+council.getAddress()+"', '"+council.getPhone()+"', '"+council.getEmail()+"', '"+
            council.getWeb()+"', '"+council.getPostalCode()+"', '"+council.getIban()+"');"
        console.log(query)
        return new Promise((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        console.log(err)
                        reject()
                    }
                    console.log(results)

                    if (results != undefined){
                        resolve(results.insertId)
                    }
                    resolve()
                })

            })
        })
    }
    /**
     * Edit council info
     * user: N -> editCouncilInDB()
     *
     * @param council - council with new data
     * @returns
     */
    public editCouncilInDB(council: Council): Promise<void> {
        console.log("edit council db handler")
        var query = "UPDATE council SET name = '"+council.getName()+"', address = '"+council.getAddress()+"', phone_number = '"+council.getPhone()+"'," +
            "email = '"+council.getEmail()+"', web = '"+council.getWeb()+"', postal_code = '"+council.getPostalCode()+"', iban = '"+council.getIban()+"'" +
            " WHERE id ="+council.getId()+";"
        return new Promise<void>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        console.log(err)
                        reject()
                    }

                    resolve()
                })

            })
        })
    }
    /**
     * Remove a council by given id
     * userId: N -> removeCouncilInDB()
     *
     * @param councilId - ID of the council we want to delete
     * @returns
     */
    public removeCouncilInDB(councilId: number): Promise<void> {
        var query = "DELETE FROM `council` WHERE `id`=" + councilId + ";"
        return new Promise<void>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject()
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();
                    // If connection fails
                    if (err) {
                        reject()
                    }

                    resolve()
                })

            })
        })
    }
}
