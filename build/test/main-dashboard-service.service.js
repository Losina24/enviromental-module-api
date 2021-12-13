"use strict";
/**
 * Name: main-dashboard-service.service.ts
 * Date: 11 - 12 - 2021
 * Author: Alejandro Losa García
 * Description: Fake logic service used to manage all dashboard communication with the API via REST
 */
/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainDashboardServiceService {

  // API URL
  api: string = 'http://localhost:8080/v2';

  // Constructor
  constructor(private _httpClient: HttpClient) { }

  // Fake logic methods
  /**
   * Fake logic's method to getting the measures of a user
   * Z, Text -> getDevices() -> Z
   *
   * @param id If the role is root or user, the ID takes the user identification, but if the role is admin, the ID takes the council ID value
   * @param userRole
   * @returns
   *
  getMeasures(id: number, userRole: string): Observable<any> {
    if(userRole == 'root') {
      return this._httpClient.get(`${this.api}/enviromental/measures/count`)
    } else if (userRole == 'admin') {
      // Get all the measures of a council because is the same that obtain all measures of an admin
      return this._httpClient.get(`${this.api}/enviromental/measures/count/council/${id}`)
    } else {
      return this._httpClient.get(`${this.api}/enviromental/measures/count/user/${id}`)
    }
  }

  /**
   * Fake logic's method to obtain the user's devices
   * Z, Text -> getDevices() -> Z
   *
   * @param id If the role is root or user, the ID takes the user identification, but if the role is admin, the ID takes the council ID value
   * @param userRole
   * @returns Enviromental device list
   *
  getDevices(id: number, userRole: string): Observable<any> {
    if(userRole == 'root') {
      return this._httpClient.get(`${this.api}/enviromental/devices/count}`)
    } else if (userRole == 'admin') {
      return this._httpClient.get(`${this.api}/enviromental/devices/count/council/${id}`)
    } else {
      return this._httpClient.get(`${this.api}/enviromental/devices/count/user/${id}`)
    }
  }

  /**
   * Fake logic's method to obtain the user's notification count
   * Z, Text -> getAlerts() -> Z
   *
   * @param id If the role is root or user, the ID takes the user identification, but if the role is admin, the ID takes the council ID value
   * @param userRole
   * @returns
   *
  getAlerts(id: number, userRole: string): Observable<any> {
    if(userRole == "root") {
      return this._httpClient.get(`${this.api}/notifications/count/root`)
    } else if(userRole == "admin") {
      return this._httpClient.get(`${this.api}/notifications/count/council/${id}`)
    } else {
      return this._httpClient.get(`${this.api}/notifications/count/user/${id}`)
    }
  }

  /**
   * Fake logic's method to obtain the user's sensor count
   * Z, Text -> getSensors() -> Z
   *
   * @param id If the role is root or user, the ID takes the user identification, but if the role is admin, the ID takes the council ID value
   * @param userRole
   * @returns
   *
  getSensors(id: number, userRole: string): Observable<any> {
    if(userRole == "root") {
      return this._httpClient.get(`${this.api}/enviromental/sensors/count`)
    } else if(userRole == "admin") {
      return this._httpClient.get(`${this.api}/enviromental/sensors/count/council/${id}`)
    } else {
      return this._httpClient.get(`${this.api}/enviromental/sensors/count/user/${id}`)
    }
  }

  /**
   * Fake logic's method to obtain the user's gateway count
   * Z, Text -> getGateways() -> Z
   *
   * @param userId
   * @param userRole
   * @returns
   *
  getGateways(userId: number, userRole: string): Observable<any> {
    if (userRole == "root") {
      return this._httpClient.get(`${this.api}/gateways/count`)
    } else {
      return this._httpClient.get(`${this.api}/gateways/count/${userId}`)
    }
  }

  /**
   * Fake logic's method to obtain the user's council count
   * Z, Text -> getCouncils() -> Z
   *
   * @param userId
   * @param userRole
   * @returns
   *
  getCouncils(userId: number, userRole: string): Observable<any> {
    if (userRole == "root") {
      return this._httpClient.get(`${this.api}/councils/count`)
    } else {
      return this._httpClient.get(`${this.api}/councils/count/${userId}`)
    }
  }

  getNS(userId: number, userRole: string): Observable<any> {
    if (userRole == "root") {
      return this._httpClient.get(`${this.api}/network_servers/count`)
    } else {
      return this._httpClient.get(`${this.api}/network_servers/count/${userId}`)
    }
  }

  getUsers(userId: number, userRole: string): Observable<any> {
    if (userRole == "root") {
      return this._httpClient.get(`${this.api}/users/count`)
    } else {
      return this._httpClient.get(`${this.api}/users/count/${userId}`)
    }
  }
}
*/ 
