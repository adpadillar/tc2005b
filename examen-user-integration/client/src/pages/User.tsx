import DescriptionsSection from "@/components/custom/DescriptionsSection";
import SafeArea from "@/components/custom/SafeArea";
import UserBanner from "@/components/custom/UserBanner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useParams } from "react-router-dom";

interface UserPageProps {
  children?: React.ReactNode;
}

const UserPage: React.FC<UserPageProps> = () => {
  const params = useParams();
  const userid = params.userid!;

  return (
    <div className="bg-gray-50">
      <UserBanner userid={userid} />
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={70} className="h-full">
          <SafeArea>
            <div className="p-4 h-full">Hello world from panel 1</div>
          </SafeArea>
        </ResizablePanel>
        <ResizableHandle className="w-0.5 active:w-1 hover:w-1 transition-all transform hover:bg-black/40 active:bg-black/40 bg-black/15 rounded-full" />
        <ResizablePanel defaultSize={30} className="h-full">
          <SafeArea>
            <div className="p-2">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="history">
                    History
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="assistant">
                    Assistant
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <DescriptionsSection userid={userid} />
                </TabsContent>
                <TabsContent value="assistant">
                  Assistant screen goes here
                </TabsContent>
              </Tabs>
            </div>
          </SafeArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default UserPage;
