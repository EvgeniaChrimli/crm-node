import z from "zod";
import {
  createBranchSchema,
  getBranchesQuerySchema,
  updateBranchSchema,
} from "./schema.js";

export type Branch = {
  id: number;
  name: string | null;
  phone: string | null;
  created_at: string;
};

export type CreateBranchBody = z.infer<typeof createBranchSchema>;

export type GetBranchesDto = BranchesQueryDto;

export type UpdateBranchDto = z.infer<typeof updateBranchSchema>;

export type BranchesQueryDto = z.infer<typeof getBranchesQuerySchema>;
