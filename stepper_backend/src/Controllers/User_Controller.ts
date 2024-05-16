/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db.config";
import { Request, Response, } from "express";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";

const createUser = async (req: Request, res: Response) => {
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
    // in operator is not there in the prisma

    console.log("df df",req.body);

    const cardModifynumber = cardNumber.split("-").join("");

    // any of this will be there in the field
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

    // findMany method in Prisma returns an array of records based on the specified conditions

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

   
    // or
    // const cardModifynumber = cardNumber.replace(/-/g, "")

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

    return res
      .status(201)
      .json(ApiResponse(201, user, "User created successfully"));
  } catch (error:any) {
    throw ApiError(500, error.message);
  }
};

export default createUser;
