# -*- coding: utf-8 -*-
"""
Created on Fri Dec  3 11:29:26 2021

@author: Yeray Candel Sampedro
"""

import pandas as pd
import folium
from folium import plugins
import webbrowser
import os
import sys
import json
from folium.plugins import MarkerCluster

ROOT_DIR =os.path.dirname(sys.modules['__main__'].__file__)
nombreArchivo = "data.json"
archivo = nombreArchivo;

# Opening JSON file
f = open(archivo)
with open(archivo) as json_file:
    data = json.load(json_file)
 

# returns JSON object as
# a dictionary

# Closing file
f.close()

df_councils = pd.json_normalize(data, record_path =['councils'])
   
df_gateways = pd.json_normalize(data, record_path =['gateways'] )
df_devices = pd.json_normalize(data, record_path =['devices'] )
#df_officialStations = pd.json_normalize(data, record_path =['officialStations'] )

mapa_sensores = folium.Map(location=(38.968,-0.19), tiles = 'Stamen Terrain', zoom_start = 12)

councils = plugins.MarkerCluster( name="Ayuntamientos",).add_to(mapa_sensores)
gateways = plugins.MarkerCluster( name="Gateways",collapse = False).add_to(mapa_sensores)
gatewaysRadius = plugins.MarkerCluster( name="Gateways Radius",collapse = False).add_to(mapa_sensores)
devices = plugins.MarkerCluster( name="Dispositivos",).add_to(mapa_sensores)
officialStations = plugins.MarkerCluster( name="Estaciones de medida Oficial",).add_to(mapa_sensores)

# DATAFRAME DE LOS COUNCILS A LAS MARCAS
for lat, lng, label, in zip(df_councils.lat, df_councils.lng, df_councils.name): #dos formas diferentes de llamar a un campo
    folium.Marker(
        location=[lat, lng],
        icon=folium.Icon(color="orange", icon="fa-building", prefix = 'fa'),
        popup=label,
        ).add_to(councils)

# GATEWAYS A LAS MARCAS
for lat, lng, label, radiusLen in zip(df_gateways.lat, df_gateways.lng, df_gateways.name,  df_gateways.radius): #dos formas diferentes de llamar a un campo
    marker = folium.Marker(
        location=[lat, lng],
        icon=folium.Icon(color="blue", icon="fa-wifi", prefix = 'fa'),
        popup=label,
        ).add_to(gateways)    
    folium.Circle([lat, lng], radius=radiusLen*150,fill_color='#3186cc').add_to(gatewaysRadius)
    
    
    
    
    

# DEVICES A LAS MARCAS

#dataframe para heatmap
data_sensors = {'lat': [38.968],
	'lng': [-0.19],
	'value': float(0)}
#create dataframes de todos los posibles valores
heatMapGroup = folium.FeatureGroup()
""" g1 = folium.plugins.FeatureGroupSubGroup(heatMapGroup, 'g1')  # First subgroup of fg
g2 = folium.plugins.FeatureGroupSubGroup(heatMapGroup, 'g2')  # Second subgroup of fg
 """
co2_df = pd.DataFrame(data_sensors)
o3_df = pd.DataFrame(data_sensors)
h2_df = pd.DataFrame(data_sensors)

        
def setWeight(dangerous):
    if(dangerous == "red"):
        return float(3)
    if(dangerous == "green"):
        return float(1)
    if(dangerous == "yellow"):
        return float(2)
    return
#pop up
html = ""
#index
index = 0    
for lat, lng, label, in zip(df_devices.lat, df_devices.lng, df_devices.measurements): #dos formas diferentes de llamar a un campo
    print(lat)
    print(lng)
    print(label)
    html = ""
    for i in range(len(df_devices.measurements[index])):
        df_devices.measurements[index][i]
        print(df_devices.measurements[index][i])
        sensor_type = df_devices.measurements[index][i]['type']
        sensor_value = df_devices.measurements[index][i]['value']
        sensor_unit = df_devices.measurements[index][i]['unit']
        sensor_date = df_devices.measurements[index][i]['date']    
        html = "<ul class=\"popup-device-ul\"> <li class=\"popup-device-type\">Type:" +sensor_type + " </li> <li class=\"popup-device-value\">Value: "+ str(sensor_value)+" </li>  <li class=\"popup-device-unit\">Unit:"+sensor_unit+" </li> <li class=\"popup-device-date\">Date: "+sensor_date+"</li> </ul>" + html
        
        if(sensor_type == "SOIL"):
            new_row = {'lat':lat, 'lng':lng, 'value': float(setWeight(df_devices.measurements[index][i]['dangerous']))}
            co2_df = co2_df.append(new_row, ignore_index=True)
        if(sensor_type == "O3"):
            new_row = {'lat':lat, 'lng':lng, 'value': float(setWeight(df_devices.measurements[index][i]['dangerous']))}
            o3_df = o3_df.append(new_row, ignore_index=True)
        
        
        
    
    test = folium.Html(html, script=True)
    popup = folium.Popup(test, max_width=2650)
    folium.Marker(
        location=[lat, lng],
        icon=folium.Icon(color="green", icon="fa-asterisk", prefix = 'fa'),
        popup=popup,
        ).add_to(devices)
    index += 1

plugins.HeatMap(data=co2_df[['lat', 'lng', 'value']], radius=20, use_local_extrema=True, name="Mapa de calor de co2",gradient={0: 'green', 0.5: 'lime', 1: 'red'},blur=15).add_to(mapa_sensores)
plugins.HeatMap(data=o3_df[['lat', 'lng', 'value']], radius=20, use_local_extrema=True, name="Mapa de calor de o3",gradient={0: 'green', 0.5: 'lime', 1: 'red'},blur=10).add_to(mapa_sensores)





""" # ESTACIONES OFICIALES A LAS MARCAS
for lat, lng, label, in zip(df_officialStations.lat, df_officialStations.lng, df_officialStations.name): #dos formas diferentes de llamar a un campo
    folium.Marker(
        location=[lat, lng],
        icon=folium.Icon(color="orange", icon="fa-bell", prefix = 'fa'),
        popup=label,
        ).add_to(officialStations)
        
     """
    
#DEVICES


# publicar el mapa
print(mapa_sensores)
folium.LayerControl().add_to(mapa_sensores)
mapa_sensores.save("mapa_cont.html")
webbrowser.open_new_tab('mapa_cont.html')

#print(data['gateways'])+


# Es opcional colocar el tipo de separador y la codificación. Por defecto es , y UTF-8 peró hay ficheros csv
# con formato sep=';', encoding = 'cp1252')