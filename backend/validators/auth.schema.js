const { z } = require('zod')
const MAX_ID = 2147483647 // common INT max

const mongoIdSchema = z
    .string({
        error: 'Id must be a string',
    })
    .trim()
    .regex(/^[a-f\d]{24}$/i, 'Invalid Id format')

const autoIncrementIdSchema = z.coerce
    .number({
        error: 'Id is required',
    })
    .int('Id must be an integer')
    .positive('Id must be greater than 0')
    .max(MAX_ID, `Id must be less than or equal to ${MAX_ID}`)
    .safe()

const passwordSchema = z
    .string({
        error: 'Password is required',
    })
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
    )

const baseFields = {
    user_name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name too long')
        .regex(/^[a-zA-Z\s]+$/, 'Only letters and spaces allowed'),

    user_handle: z
        .string()
        .trim()
        .min(3, 'Handle must be at least 3 characters')
        .max(20, 'Handle too long')
        .regex(
            /^[a-zA-Z0-9_]+$/,
            'Handle can only contain letters, numbers, and underscores'
        ),

    email: z
        .string({
            error: 'Email must be string',
        })
        .trim()
        .min(1, 'Email is required')
        .max(254, 'Email is too long')
        .email('Invalid email')
        .transform((val) => val.toLowerCase()),

    password: passwordSchema,

    Profile_image: z.url('Invalid image URL').optional(),

    contact_detail: z
        .string()
        .trim()
        .regex(/^[+]?[0-9]{10,15}$/, 'Contact number must be 10-15 digits')
        .optional(),
}

const registerSchema = z.discriminatedUnion('isDoctor', [
    z
        .object({
            ...baseFields,
            isDoctor: z.literal(false),
        })
        .strict(),

    z
        .object({
            ...baseFields,
            isDoctor: z.literal(true),

            qualification: z
                .string()
                .trim()
                .min(2, 'Qualification required')
                .max(100),

            specialization: z
                .string()
                .trim()
                .min(2, 'Specialization required')
                .max(100),

            Years_of_experience: z
                .number({
                    error: 'Experience must be a number',
                })
                .int('Experience must be a whole number')
                .min(0, 'Cannot be negative')
                .max(60, 'Experience looks unrealistic'),

            contact_detail: z
                .string()
                .trim()
                .regex(
                    /^[+]?[0-9]{10,15}$/,
                    'Doctor contact number must be 10-15 digits'
                ),
        })
        .strict(),
])

const loginSchema = z.object({
    email: z
        .string({
            error: 'Email must be string',
        })
        .trim()
        .min(1, 'Email is required')
        .max(254, 'Email is too long')
        .email('Invalid email')
        .transform((val) => val.toLowerCase()),

    password: passwordSchema,

    fcmToken: z
        .string({
            error: 'FCM token must be a string',
        })
        .trim()
        .min(100, 'Invalid FCM token')
        .max(4096, 'FCM token is too long')
        .regex(/^[A-Za-z0-9\-_:]+$/, 'Invalid FCM token format'),
})

const profileImageParamSchema = z.object({
    userId: mongoIdSchema,
})

const userProfileQuerySchema = z
    .object({
        id: mongoIdSchema.optional().or(z.literal('')),

        handle: z
            .string()
            .trim()
            .min(3, 'Handle must be at least 3 characters')
            .max(20, 'Handle too long')
            .regex(
                /^[a-zA-Z0-9_]+$/,
                'Handle can only contain letters, numbers, and underscores'
            )
            .optional()
            .or(z.literal('')),
    })
    .refine(
        (data) => {
            const hasUserId = !!data.id && data.id.trim() !== ''
            const hasUserHandle = !!data.handle && data.handle.trim() !== ''

            return hasUserId !== hasUserHandle // XOR
        },
        {
            message: 'Provide either user id or user handle, but not both',
            path: ['id'],
        }
    )

const followUnfollowSchema = z
    .object({
        articleId: autoIncrementIdSchema.optional(),
        followUserId: mongoIdSchema.optional(),
    })
    .refine(
        (data) => {
            const hasArticleId = !!data.articleId
            const hasFollowUserId = !!data.followUserId

            return hasArticleId !== hasFollowUserId // XOR
        },
        {
            message: 'Provide either articleId or followUserId, but not both',
            path: [],
        }
    )

const forgotPasswordSchema = z.object({
    email: z
        .string({
            error: 'Email must be string',
        })
        .trim()
        .min(1, 'Email is required')
        .max(254, 'Email is too long')
        .email('Invalid email')
        .transform((val) => val.toLowerCase()),
})

const verifyOtpSchema = z.object({
    email: z
        .string({
            error: 'Email must be string',
        })
        .trim()
        .min(1, 'Email is required')
        .max(254, 'Email is too long')
        .email('Invalid email')
        .transform((val) => val.toLowerCase()),
    newPassword: passwordSchema,
    otp: z
        .string({
            error: 'OTP is required',
        })
        .trim()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain only numbers'),
})

const deleteAccountSchema = z.object({
    password: passwordSchema,
})

const resendVerificationSchema = z.object({
    email: z
        .string({
            error: 'Email must be string',
        })
        .trim()
        .min(1, 'Email is required')
        .max(254, 'Email is too long')
        .email('Invalid email')
        .transform((val) => val.toLowerCase()),
})

const profileImageUpdateSchema = z.object({
    profileImageUrl: z.url('Invalid image URL'),
})

const updatePasswordSchema = z
    .object({
        old_password: passwordSchema,
        new_password: passwordSchema,
    })
    .strict()
    .refine((data) => data.old_password !== data.new_password, {
        message: 'New password must be different from old password',
        path: ['new_password'],
    })

const updateGeneralDetailsSchema = z
    .object({
        username: baseFields.user_name,

        userHandle: baseFields.user_handle,

        about: z
            .string()
            .trim()
            .max(160, 'About section cannot exceed 160 characters')
            .optional(),
    })
    .strict();

const updateContactDetailsSchema = z.object({
    email: baseFields.email,
    phone: baseFields.contact_detail,
}).strict();

const updateProfessionalDetailsSchema = z.object({
    qualification: z
        .string()
        .trim()
        .min(2, 'Qualification required')
        .max(100),

    specialization: z
        .string()
        .trim()
        .min(2, 'Specialization required')
        .max(100),

    Years_of_experience: z
        .number({
            error: 'Experience must be a number',
        })
        .int('Experience must be a whole number')
        .min(0, 'Cannot be negative')
        .max(60, 'Experience looks unrealistic'),
}).strict()
module.exports = {
    registerSchema,
    loginSchema,
    profileImageParamSchema,
    userProfileQuerySchema,
    followUnfollowSchema,
    forgotPasswordSchema,
    verifyOtpSchema,
    deleteAccountSchema,
    resendVerificationSchema,
    profileImageUpdateSchema,
    updatePasswordSchema,
    updateGeneralDetailsSchema,
    updateContactDetailsSchema,
    updateProfessionalDetailsSchema
}
