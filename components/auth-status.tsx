"use client";

import { useAuthUser, useIsAuthenticated, useLogout, useMe } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function AuthStatus() {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser();
  const { data: meData, isLoading } = useMe();
  const logoutMutation = useLogout();

  if (isLoading) {
    return <div className="p-4 text-center">Loading user info...</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Authentication Status</h2>
      
      <div className="space-y-2">
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>
        
        {user && (
          <div>
            <p><strong>User from Storage:</strong></p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
        
        {meData && (
          <div>
            <p><strong>User from API:</strong></p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
              {JSON.stringify(meData, null, 2)}
            </pre>
          </div>
        )}
        
        {isAuthenticated && (
          <Button 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            variant="destructive"
            size="sm"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        )}
      </div>
    </div>
  );
}