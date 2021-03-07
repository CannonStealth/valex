import guild from "./guild-schema"
import { Client } from "discord.js"
import { Schema } from "mongoose"

export default async (client: any) => {
    
    const server = await guild.find()
    if (!server) return

    for (const result of server) {
        // @ts-ignore
        if(result || result._id || result.disabled_commands || result.disabled_commands.length) {
        // @ts-ignore
        client.disabled.set(result._id, result.disabled_commands)
    }}
}