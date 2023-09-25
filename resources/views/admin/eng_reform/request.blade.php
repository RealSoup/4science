
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title> eMail - 영문교정 접수 </title>
	</head>
	<body style="padding:0;margin:0;text-align:center;">
		<table cellpadding="0" cellspacing="0" border="0" width="700" style="border:1px solid #d5d5d5;">
			<tr>
				<td>
					<table cellpadding="0" cellspacing="0" border="0" width="700" style="border-collapse:collapse;padding:0;border-bottom:2px solid #0095eb;">
						<tr>
							<td colspan="4" height="19"></td>
						</tr>
						<tr>
							<td width="30"></td>
							<td width="162"><a href="{{ env('APP_URL') }}" target="_blank" title="4science 바로가기"><img src="{{ env('APP_URL') }}storage/common/logo/email_logo.png" alt="4science.net" align="absmiddle" border="0" /></a></td>
							<td width="478" align="right" valign="bottom" style="font-family:'dotum';font-size:12px;color:#888888">본 메일은 {{date('Y-m-d')}}기준으로 작성되었습니다.</td>
							<td width="30"></td>
						</tr>
						<tr>
							<td colspan="4" height="8"></td>
						</tr>
					</table>
					<table cellpadding="0" cellspacing="0" border="0" width="700" style="border-collapse:collapse;padding:0;">
						<tr>
							<td width="700" colspan="3"><img src="{{ env('APP_URL') }}storage/common/engReform_top.png" alt="영문교정 요청이 접수 되었습니다! - 4science를 이용해 주셔서 감사합니다. 고객님께서 요청하신 영문교정 의뢰가 접수 되었습니다." align="absmiddle" border="0" /></td>
						</tr>
						<tr>
							<td width="700" colspan="3" height="30"></td>
						</tr>
						<tr>
							<td width="30"></td>
							<td width="640">
								<table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;border-top:1px solid #ececec;border-left:2px solid #3a3a3a;border-right:2px solid #3a3a3a;border-bottom:1px solid #ececec;">
									<tr>
										<td width="640" height="30"></td>
									</tr>
									<tr>
										<td width="640" style="font-family:'dotum';font-size:12px;color:#3a3a3a;line-height:20px;text-align:center;">{{$con['er_name']}} 고객님, 안녕하세요!<br />고객님께서 요청하신 영문교정 의뢰 내역입니다.</td>
									</tr>
									<tr>
										<td width="640" height="19"></td>
									</tr>
									<tr>
										<td width="640" style="font-family:'dotum';font-size:11px;color:#3a3a3a;line-height:20px;text-align:center;">
											* 메일을 확인하신 후 영문교정 진행 의사를 매일 또는 전화로 알려주시면 영문교정서비스가 진행됩니다.<br />
											* 진행의사를 알려주지 않으실 경우 신청하신 영문교정은 신청취소로 처리되니 이점 양지해 주시기바랍니다.<br />
										</td>
									</tr>
									<tr>
										<td width="640" height="19"></td>
									</tr>
									<tr>
										<td width="640">
											<table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;">
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">이름</th>
													<td width="20" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_name']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">소속</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_company']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">이메일</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_email']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">휴대전화</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_hp']}}</td>
													<td width="100" height="40"></td>
												</tr>


											</table>
										</td>
									</tr>
									<tr>
										<td width="640" height="19"></td>
									</tr>
									<tr>
										<td width="640">
											<table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;">
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">신청일/납기일</th>
													<td width="20" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-top:2px solid #50b947;border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{date('Y-m-d', strtotime($con['created_at']))}}/{{$con['er_dlvy_at']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">포맷팅</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">
														@if ($con['er_format'] === 'NFM') 	No-formatting
														@else								formatting
														@endif
													</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">URL</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_journal_url']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">문서용도</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_use']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">학문분야</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_branch']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">하위학문분야</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_branch_sub']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">에디터</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_editor']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">문체스타일</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_editor']}}</td>
													<td width="100" height="40"></td>
												</tr>
												<tr>
													<th width="100" height="40"></th>
													<th width="125" height="40" style="border-bottom:1px solid #d5d5d5;background-color:#f8f8f8;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:center;font-weight:bold;">요청사항</th>
													<td width="20" height="40" style="border-bottom:1px solid #d5d5d5;"></td>
													<td width="291" height="40" style="border-bottom:1px solid #d5d5d5;font-family:'dotum';font-size:12px;color:#3a3a3a;text-align:left;">{{$con['er_demand']}}</td>
													<td width="100" height="40"></td>
												</tr>

											</table>
										</td>
									</tr>
									<tr>
										<td width="640" height="30"></td>
									</tr>
									<tr>
										<td width="640" align="center">
											<table cellpadding="0" cellspacing="0" border="0" width="640" style="border-collapse:collapse;padding:0;">
												<tr>
													<th width="100"></th>
													<td width="218" align="left"><a href="{{ env('APP_URL') }}" target="_blank" title="4science 바로가기"><img src="{{ env('APP_URL') }}storage/common/eng_btn01.png" alt="4science 바로가기" align="absmiddle" border="0" /></a></td>
													<td width="218" align="right"><a href="{{ env('APP_URL') }}mypage/eng_reform" target="_blank" title="영문교정 요청 내역"><img src="{{ env('APP_URL') }}storage/common/eng_btn02.png" alt="영문교정 요청 내역" align="absmiddle" border="0" /></a></td>
													<td width="100"></td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td width="640" height="30"></td>
									</tr>
								</table>
							</td>
							<td width="30"></td>
						</tr>
						<tr>
							<td width="700" colspan="3" height="30"></td>
						</tr>
						<tr>
							<td width="700" colspan="3"><img src="{{ env('APP_URL') }}storage/common/email_bottom.png" alt="본 메일은 발신전용이므로 회신하실 경우 답변되지 않습니다. / 주소:경기도 성남시 분당구 삼평동 621번지 판교이노밸리 C동 402호 iNexus, Inc., 4science 사업부 / 대표전화:1644-4214 / 팩스:031-8018-7272 / 이메일:sales@4science.net / 사업자등록번호:204-81-47440 / 통신판매업신고번호:제2011-경기성남-1046호 (주)아이넥서스 대표이사 정미영 / Copyright 2013 by iNexus, Inc., All rights reserved." align="absmiddle" border="0" /></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>