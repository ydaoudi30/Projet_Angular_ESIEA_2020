import { Menu } from './menu.model';

export const adminMenu = [  
    new Menu (1, 'Users', 'users', null, 'supervisor_account', null, false, 0),
    new Menu (2, 'Horses', 'horses', null, 'supervisor_account', null, false, 0)
]
export const publicMenu = [ 
    new Menu (1, 'My Rides', 'rides', null, 'supervisor_account', null, false, 0)
]
export const instructorMenu = [ 
    new Menu (1, 'Schedules', 'schedules', null, 'supervisor_account', null, false, 0) 
]