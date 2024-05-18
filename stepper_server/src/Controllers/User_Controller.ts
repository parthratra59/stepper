
import prisma from "../db/db.config"
import { Request, Response, } from "express";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";

const createUser = async (req: Request, res: Response) => {
  // Destructure the user details from the request body
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      dob,
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
    } = req.body;
 

    
 // Remove hyphens from the card number to standardize the format
    const cardModifynumber = cardNumber.split("-").join("");

  // Check if a user already exists with the given email, phone number, or card number
    const findUser = await prisma.user.findMany({
      where: {
        OR: [
          { email: email },
          { phoneNumber: phoneNumber },
          { cardNumber: cardModifynumber },
        //  dd
        ],
      },
    });

    // If a user already exists with any of the provided details, return a 400 response

    if (findUser.length > 0) {
      return res
        .status(400)
        .json(
          ApiResponse(
            400,
            null,
            "User already exists with the provided details"
          )
        );
    }

   
   // Create a new user with the provided details

    const user = await prisma.user.create({
      data: {
        fullName: fullName?.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        address: address?.trim(),
        dob: dob?.trim(),
        cardNumber: cardModifynumber.trim(),
        cardHolderName: cardHolderName?.trim(),
        expiryDate: expiryDate.trim(),
        cvv: cvv.trim(),
      },
    });

     // Return a 201 response with the created user data
    return res
      .status(201)
      .json(ApiResponse(201, user, "User created successfully"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    // In case of an error, throw an ApiError with a 500 status code
    throw ApiError(500, error.message);
  }
};

export default createUser;
