const uuid = require('uuid');
const UUID = require('uuid-int');
// number  0 <= id <=511
const id = 0;

const generator = UUID(id);

const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        }
    });

    const table = 'location';

    const getLocations = async () => {
        try {
            return await knex(table).select('*');
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw error;
        }
    };
    
    const crearLocation = async (id_disp, lat, lon) => {
        try {
            return await knex(table).insert({
                ID : null,
                disp_ID: id_disp,
                fecha : current_timestamp(),
                lat: lat,
                lon: lon
            });
        } catch (error) {
            console.error('Error creating location:', error);
            throw error;
        }
    };
    
    const updateLocation = async (id, lat, lon) => {
        try {
            return await knex(table).where({ id: id }).update({
                lat: lat,
                lon: lon
            });
        } catch (error) {
            console.error('Error updating location:', error);
            throw error;
        }
    };
    
    const deleteLocation = async (id) => {
        try {
            return await knex(table).where({ id: id }).del();
        } catch (error) {
            console.error('Error deleting location:', error);
            throw error;
        }
    };
    
    return {crearLocation, getLocations, updateLocation, deleteLocation};
};

module.exports = {
    databaseService
};

