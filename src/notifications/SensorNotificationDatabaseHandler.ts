/**
 * Name: EnviromentaDeviceDatabaseHandler.ts
 * Date: 02 - 11 - 2021
 * Author: Alejandro Losa García
 * Description: Manages the database queries of the enviromental device feature
 */

import db from "../database";
import SensorNotification from "./SensorNotification";

export default class SensorNotificationDatabaseHandler {

    // Private methods used to reuse code in EnviromentalDeviceDatabaseHandler class
    private queryResultsToEnviromentalDevices(results: object[]) : SensorNotification[] {
        let notifications: SensorNotification[] = [];

        results.forEach( (element:any) => {
            let notification = new SensorNotification();

            notification.setId(element.id)
            notification.setSensorId(element.sensor_id);
            notification.setBody(element.body);
            notification.setSubject(element.subject);
            notification.setMagnitude(element.magnitude);

            notifications.push(notification);
        });

        return notifications;
    }

    // Methods
    /**
     * Get the user related notifications
     * userId: N -> getNotificationsByUserIdFromDB() -> notification: SensorNotification[]
     *
     * @param userId - the id of the user you want to get the notifications from
     * @returns
     */
    public async getNotificationsByUserIdFromDB(userId: number): Promise<SensorNotification> {
        var query = "SELECT notification.* FROM user_device INNER JOIN sensor ON user_device.device_id=sensor.device_id " +
            "INNER JOIN notification ON sensor.id=notification.sensor_id WHERE user_device.user_id = "+userId+";";

        return new Promise<SensorNotification>((resolve: any, reject: any) => {
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

                    let notifications = this.queryResultsToEnviromentalDevices(results)
                    resolve(notifications)
                })

            })
        })
    }

    /**
     * Get the information about a notification by given id
     * notificationId: N -> getSensorNotificationByIdFromDB() -> notification: SensorNotification
     *
     * @param notificationId - notification ID
     * @returns
     */
    public async getSensorNotificationByIdFromDB(notificationId: number): Promise<SensorNotification> {
        var query = "SELECT * FROM notification WHERE id = " + notificationId;

        return new Promise<SensorNotification>((resolve: any, reject: any) => {
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

                    let notification = new SensorNotification();

                    notification.setId(results[0].id)
                    notification.setSensorId(results[0].sensor_id);
                    notification.setBody(results[0].body);
                    notification.setSubject(results[0].subject);
                    notification.setMagnitude(results[0].magnitude);

                    resolve(notification)
                })

            })
        })
    }

    /**
     * Get all the sensor notifications by given sensor id
     * sensorId: N -> getSensorNotificationsBySensorIdFromDB() -> notifications: SensorNotification[]
     *
     * @param sensorId - ID of the sensor we want to get the notifications from
     * @returns
     */
    public async getSensorNotificationsBySensorIdFromDB(sensorId: number): Promise<SensorNotification> {
        var query = "SELECT * FROM notification WHERE sensor_id = " + sensorId;

        return new Promise<SensorNotification>((resolve: any, reject: any) => {
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

                    let notifications = this.queryResultsToEnviromentalDevices(results)
                    resolve(notifications)
                })

            })
        })
    }
    /**
     * Create a new notification
     * notification: SensorNotification -> createSensorNotificationInDB() ->
     *
     * @param notification - The notification we want to store
     * @returns
     */
    public createSensorNotificationInDB(notification: SensorNotification): Promise<any> {
        // Hay que cambiar la columna 'mac' de la base de datos para que sea un varchar()
        var query = "INSERT INTO `notification` (`sensor_id`, `body`, `subject`, `magnitude`) VALUES ("+notification.getSensorId()
            +", '"+notification.getBody()+"', '"+notification.getSubject()+"', '"+notification.getMagnitude()+"')"

        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(error)
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // Si la consulta falla
                    if (err) {
                        reject(err)
                    }
                    console.log(results)
                    resolve(results)
                })

            })
        })
    }

    /**
     * Edit notification data
     * notification: SensorNotification -> editSensorNotificationInDB() ->
     *
     * @param notification - new notification
     * @returns
     */
    public editSensorNotificationInDB(notification: SensorNotification): Promise<any> {

        var query = "UPDATE notification" +
            " SET sensor_id = " + notification.getSensorId() + ", body = '" + notification.getBody() + "', subject = '" + notification.getSubject() +
            "', magnitude = '" + notification.getMagnitude() + "' WHERE id=" + notification.getId() + ";";

        return new Promise<any>((resolve: any, reject: any) => {
            db.getConnection((error: any, conn: any) => {

                // If connection fails
                if (error) {
                    reject(error)
                }

                conn.query(query, (err: any, results: any) => {
                    conn.release();

                    // If connection fails
                    if (err) {
                        reject(err)
                    }
                    console.log(query)
                    console.log(results)
                    resolve(results)
                })

            })
        })
    }

    /**
     * Get all enviromental devices from a council
     * notificationId: N -> removeNotificationInDB() ->
     *
     * @param notificationId - ID of the notification we want to remove
     * @returns
     */
    public removeNotificationInDB(notificationId: number): Promise<void> {
        var query = "DELETE FROM `notification` WHERE id =" + notificationId + ";";

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

                    resolve();
                })

            })
        })
    }
}
