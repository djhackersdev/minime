export interface UpsertUserChargelogApiRequest {
    userId: string;

    userChargelog: {
        chargeId: string,
        price: string,
        purchaseDate: Date,
        playCount: string,
        playerRating: string,
        placeId: string,
        regionId: string,
        clientId: string
    };

    userCharge: {
        chargeId: string,
        stock: string,
        purchaseDate: Date,
        validDate: Date,
        param1: string,
        param2: string,
        paramDate: Date
    };
}