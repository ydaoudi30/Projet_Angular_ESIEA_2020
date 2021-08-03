export class Api { 
    // =========== auth ===============================================================
    public static REGISTER = '/register'; 
    public static LOGOUT = '/logout'; 
    public static LOGIN = '/authenticate';
    static ME = '/auth/me';
    // =========== General ===============================================================
    public static CREATE_HORSE = '/pjweb/addhorse'; 
    public static GET_ALL_HORSES = '/pjweb/horses'; 
    public static CREATE_SCHEDULE = '/pjweb/addSchedule'; 
    public static GET_ALL_SCHEDULE = '/pjweb/schedules'; 
    public static CREATE_RIDE = '/pjweb/addRide'; 
    public static GET_ALL_RIDES = '/pjweb/rides'; 

    // =========== Users & User Group ========================================================
    public static GET_ALL_USERS = '/users'; 
}

