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
   * @param id 
   * @param userRole 
   * @returns 
   *
  getMeasures(id: number, userRole: string): Observable<any> {
    // If the role is root or user, the ID takes the user identification, but if the role is admin, the ID takes the council ID value 
    var role: string;

    if(userRole == 'root') {
      role = 'root';
    } else if (userRole == 'admin') {
      role = 'council';
    } else {
      role = 'user';
    }

    return this._httpClient.get(`${this.api}/enviromental/measures/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's devices
   * Z, Text -> getDevices() -> Z
   * 
   * @param id
   * @param userRole 
   * @returns Enviromental device list
   *
  getDevices(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else if (userRole == 'admin') {
      role = 'council';
    } else {
      role = 'user';
    }

    return this._httpClient.get(`${this.api}/enviromental/devices/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's notification count
   * Z, Text -> getAlerts() -> Z
   * 
   * @param id 
   * @param userRole
   * @returns 
   *
  getAlerts(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else if (userRole == 'admin') {
      role = 'council';
    } else {
      role = 'user';
    }

    return this._httpClient.get(`${this.api}/notifications/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's sensor count
   * Z, Text -> getSensors() -> Z
   * 
   * @param id 
   * @param userRole 
   * @returns 
   *
  getSensors(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else if (userRole == 'admin') {
      role = 'council';
    } else {
      role = 'user';
    }

    return this._httpClient.get(`${this.api}/enviromental/sensors/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's gateway count
   * Z, Text -> getGateways() -> Z
   * 
   * @param id
   * @param userRole
   * @returns 
   *
  getGateways(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else {
      role = 'council';
    }

    return this._httpClient.get(`${this.api}/gateways/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's council count
   * Z, Text -> getCouncils() -> Z
   * 
   * @param id
   * @param userRole
   * @returns 
   *
  getCouncils(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else {
      role = 'council';
    }

    return this._httpClient.get(`${this.api}/councils/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's network server count
   * Z, Text -> getNS() -> Z
   * 
   * @param id 
   * @param userRole 
   * @returns 
   *
  getNS(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else {
      role = 'council';
    }

    return this._httpClient.get(`${this.api}/network_servers/count/${role}/${id}`)
  }

  /**
   * Fake logic's method to obtain the user's count of the council
   * 
   * @param id 
   * @param userRole 
   * @returns 
   *
  getUsers(id: number, userRole: string): Observable<any> {
    var role: string;
    
    if(userRole == 'root') {
      role = 'root';
    } else {
      role = 'council';
    }

    return this._httpClient.get(`${this.api}/users/count/${role}/${id}`)
  }
}
*/