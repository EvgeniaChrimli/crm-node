import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { idSchema } from "../../shared/schemas/common-schemas.js";
import {
  createBranchSchema,
  getBranchesQuerySchema,
  updateBranchSchema,
} from "./schema.js";
import {
  createBranchController,
  getBranchByIdController,
  getBranchesController,
  updateBranchByIdController,
} from "./branch.controller.js";

export const branchRouter = Router();

branchRouter.get(
  "/",
  validate(getBranchesQuerySchema, "query"),
  getBranchesController,
);
branchRouter.post(
  "/",
  validate(createBranchSchema, "body"),
  createBranchController,
);
branchRouter.get("/:id", validate(idSchema, "params"), getBranchByIdController);
branchRouter.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateBranchSchema, "body"),
  updateBranchByIdController,
);
