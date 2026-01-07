import { prisma } from '../../../lib/prisma'
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema'

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const {hash, salt} = hashPassword(password)

    const user = await prisma.user.create({
        data: { ...rest, salt: salt.toString(), password: hash.toString() }
    })
    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true
        }
    });
}