import handler from "@/lib/next-connect";
import {login} from "@/controllers/auth.controller";

const router = handler();

router.post(login);

export default router;
