import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserModel } from "../../model/UserModel";

interface ProfileStore {
  profile: UserModel | null;
  setProfile: (profile: UserModel | null) => void;
}

export const useProfileStore = create<ProfileStore>()(
  devtools(
    (set) => ({
      profile: null,
      setProfile: (profile: UserModel | null) => {
        set({ profile });
      }
    }),
    { name: "ProfileStore" }
  )
);
