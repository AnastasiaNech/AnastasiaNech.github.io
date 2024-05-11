import React, { FC } from 'react';
import { ProfileCompletedForm } from './profileForm/profileCompletedForm';

export const ProfilePage: FC = () => {
    return (
        <div className="block">
            <ProfileCompletedForm />
        </div>
    );
};