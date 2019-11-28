using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            await CreateRoles(roleManager);

            await CreateAdmin(userManager);

            await dbContext.SaveChangesAsync();
        }

        private static async Task CreateRoles(RoleManager<IdentityRole> roleManager)
        {
            string role_Administrator = "Administrator";

            string role_RegisteredUser = "RegisteredUser";
            if (!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new
                IdentityRole(role_Administrator));
            }
            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new
                IdentityRole(role_RegisteredUser));
            }
        }

        private static async Task CreateAdmin(UserManager<ApplicationUser> userManager)
        {
            var user_Admin = new ApplicationUser()
            {
                UserName = "stasencia@gmail.com",
                Email = "stasencia@gmail.com"
            };

            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass_4Admin");
                await userManager.AddToRoleAsync(user_Admin, "Administrator");
                await userManager.AddToRoleAsync(user_Admin, "RegisteredUser");
                // Remove Lockout and E-Mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
        }
    }
}
