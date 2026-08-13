class Room{
    constructor(roomNo, type, pricePerNight){
        this.roomNo = roomNo;
        this.type = type;
        this.pricePerNight = pricePerNight;
        this.isAvailable = true;
    }
}

class Booking{
    constructor(cusName, room, nights){
        this.cusName = cusName;
        this.room = room;
        this.nights = nights;
        this.checkInDate = new Date();
        this.checkOutDate = new Date();
        this.checkOutDate.setDate(this.checkInDate.getDate() + nights);
        this.totalCost = nights * room.pricePerNight;
    }
}

class Hotel{
    constructor(name){
        this.name = name;
        this.rooms = [];
        this.bookings = [];
    }

    addRoom(room){
        this.rooms.push(room);
        console.log(`Room ${room.roomNo} added`);
    }

    findAvailableRooms(type){
        return this.rooms.find(room => room.type === type && room.isAvailable);
    }

    bookRoom(cusName, roomType, nights){
        const room = this.findAvailableRooms(roomType);
        if(!room){
            console.log(`Sorry, Room is not Available of ${roomType} type`);
            return null;
        }
        room.isAvailable = false;
        const booking = new Booking(cusName, room, nights);
        this.bookings.push(booking);

        console.log("Booking is done Successfully");
        return booking;
    }

    cancelBooking(cusName){
        const index = this.bookings.findIndex(b => b.cusName === cusName);
        if(index === -1){
            console.log(`No booking is found for ${cusName}.`);
            return false;
        }
        const booking = this.bookings[index];
        this.bookings.splice(index, 1);
        console.log(`Booking for ${cusName} cancelled. Room ${booking.room.roomNo} is now available`);
        return true;
    }

    listBooking(){
        if(this.bookings.length === 0){
            console.log("No current Booking");
            return;
        }
        console.log("Current Bookings");
        this.bookings.forEach(booking => {
            console.log(`- Customer: ${booking.cusName}, Room: ${booking.room.roomNo}, Nights: ${booking.nights}, Total Charges: ${booking.totalCost}`);
        });
    }

    calTotalRevenue(){
        return this.bookings.reduce((sum, b) => sum + b.totalCost, 0);
    }


}

function main(){
    const hotel = new Hotel("Radison Blu");
    hotel.addRoom(new Room(101, 'Single', 2000));
    hotel.addRoom(new Room(102, 'Double', 3500));
    hotel.addRoom(new Room(103, 'Suite', 5000));
    hotel.addRoom(new Room(201, 'Suite', 6000));
    hotel.addRoom(new Room(202, 'Single', 2500));
    console.log("\n");

    // attempt Booking
    hotel.bookRoom("Dishant Dyavarchetti", 'Double', 3);
    hotel.bookRoom("Nancy Gandhi", 'Suite', 2);
    hotel.bookRoom("Vatsal Kadia", 'Single', 1);
    hotel.bookRoom("Rishi Gangwani", 'Double', 3);
    console.log("\n");

    hotel.listBooking();
    console.log("\n");

    hotel.cancelBooking("Nancy Gandhi");
    console.log("\n");
    console.log("Hotel Booking list after cancellation");

    hotel.listBooking();
    console.log("\n");
}

main();